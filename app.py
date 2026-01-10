#!/usr/bin/env python3
"""
Gemini 2.5 Web UI with Computer and Browser Use
A Flask-based web interface for interacting with Google's Gemini 2.5 Pro
with computer use and browser automation capabilities.
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
import os
import json
import base64
from datetime import datetime
import pyautogui
from PIL import Image
import io
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Chat history storage
chat_sessions = {}

class ComputerController:
    """Handles computer use actions like screenshots, mouse, and keyboard"""
    
    @staticmethod
    def take_screenshot():
        """Capture screenshot of the entire screen"""
        screenshot = pyautogui.screenshot()
        # Convert to base64 for transmission
        buffered = io.BytesIO()
        screenshot.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        return img_str, screenshot.size
    
    @staticmethod
    def move_mouse(x, y):
        """Move mouse to coordinates"""
        pyautogui.moveTo(x, y, duration=0.5)
        return {"status": "success", "x": x, "y": y}
    
    @staticmethod
    def click(x=None, y=None, button='left'):
        """Click at current position or specified coordinates"""
        if x is not None and y is not None:
            pyautogui.click(x, y, button=button)
        else:
            pyautogui.click(button=button)
        return {"status": "success"}
    
    @staticmethod
    def type_text(text):
        """Type text using keyboard"""
        pyautogui.write(text, interval=0.05)
        return {"status": "success", "text": text}
    
    @staticmethod
    def press_key(key):
        """Press a specific key"""
        pyautogui.press(key)
        return {"status": "success", "key": key}
    
    @staticmethod
    def get_screen_size():
        """Get screen dimensions"""
        size = pyautogui.size()
        return {"width": size.width, "height": size.height}


class BrowserController:
    """Handles browser automation using Selenium"""
    
    def __init__(self):
        self.driver = None
    
    def start_browser(self, headless=False):
        """Start a new browser session"""
        if self.driver:
            self.driver.quit()
        
        chrome_options = Options()
        if headless:
            chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        return {"status": "success", "message": "Browser started"}
    
    def navigate_to(self, url):
        """Navigate to a URL"""
        if not self.driver:
            self.start_browser()
        self.driver.get(url)
        return {"status": "success", "url": url}
    
    def get_page_info(self):
        """Get current page information"""
        if not self.driver:
            return {"status": "error", "message": "Browser not started"}
        
        return {
            "url": self.driver.current_url,
            "title": self.driver.title,
            "page_source": self.driver.page_source[:1000]  # First 1000 chars
        }
    
    def take_screenshot(self):
        """Take screenshot of current browser page"""
        if not self.driver:
            return None
        
        screenshot_bytes = self.driver.get_screenshot_as_png()
        img_str = base64.b64encode(screenshot_bytes).decode()
        return img_str
    
    def click_element(self, selector, by=By.CSS_SELECTOR):
        """Click an element by selector"""
        if not self.driver:
            return {"status": "error", "message": "Browser not started"}
        
        try:
            element = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((by, selector))
            )
            element.click()
            return {"status": "success", "selector": selector}
        except Exception as e:
            return {"status": "error", "message": str(e)}
    
    def type_into_element(self, selector, text, by=By.CSS_SELECTOR):
        """Type text into an element"""
        if not self.driver:
            return {"status": "error", "message": "Browser not started"}
        
        try:
            element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((by, selector))
            )
            element.clear()
            element.send_keys(text)
            return {"status": "success", "selector": selector, "text": text}
        except Exception as e:
            return {"status": "error", "message": str(e)}
    
    def close_browser(self):
        """Close the browser"""
        if self.driver:
            self.driver.quit()
            self.driver = None
        return {"status": "success", "message": "Browser closed"}


# Global instances
computer = ComputerController()
browser = BrowserController()


@app.route('/')
def index():
    """Serve the main web UI"""
    return render_template('index.html')


@app.route('/api/check-api-key', methods=['GET'])
def check_api_key():
    """Check if API key is configured"""
    return jsonify({
        "configured": bool(GEMINI_API_KEY),
        "message": "API key is configured" if GEMINI_API_KEY else "Please set GEMINI_API_KEY environment variable"
    })


@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages with Gemini"""
    try:
        data = request.json
        message = data.get('message', '')
        session_id = data.get('session_id', 'default')
        include_screenshot = data.get('include_screenshot', False)
        api_key = data.get('api_key', GEMINI_API_KEY)
        
        if not api_key:
            return jsonify({
                "error": "No API key provided. Please set GEMINI_API_KEY or provide it in the request."
            }), 400
        
        # Configure with provided API key
        genai.configure(api_key=api_key)
        
        # Initialize or get chat session
        if session_id not in chat_sessions:
            model = genai.GenerativeModel(
                model_name='gemini-2.0-flash-exp',
                system_instruction="""You are a helpful AI assistant with computer and browser control capabilities.
                
You can:
- Take screenshots and analyze what's on the screen
- Control the mouse and keyboard
- Automate browser interactions
- Navigate websites and extract information

When users ask you to perform computer or browser actions, explain what you're doing and provide clear feedback."""
            )
            chat_sessions[session_id] = model.start_chat(history=[])
        
        chat = chat_sessions[session_id]
        
        # Prepare message parts
        message_parts = [message]
        
        # Add screenshot if requested
        if include_screenshot:
            screenshot_b64, screen_size = computer.take_screenshot()
            # Gemini expects image data in specific format
            image_data = base64.b64decode(screenshot_b64)
            image = Image.open(io.BytesIO(image_data))
            message_parts.append(image)
        
        # Send message to Gemini
        response = chat.send_message(message_parts)
        
        return jsonify({
            "response": response.text,
            "session_id": session_id,
            "timestamp": datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/computer/screenshot', methods=['POST'])
def computer_screenshot():
    """Take a screenshot"""
    try:
        screenshot_b64, size = computer.take_screenshot()
        return jsonify({
            "screenshot": screenshot_b64,
            "width": size[0],
            "height": size[1]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/computer/mouse', methods=['POST'])
def computer_mouse():
    """Control mouse"""
    try:
        data = request.json
        action = data.get('action', 'move')
        
        if action == 'move':
            x = data.get('x')
            y = data.get('y')
            result = computer.move_mouse(x, y)
        elif action == 'click':
            x = data.get('x')
            y = data.get('y')
            button = data.get('button', 'left')
            result = computer.click(x, y, button)
        else:
            return jsonify({"error": "Unknown action"}), 400
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/computer/keyboard', methods=['POST'])
def computer_keyboard():
    """Control keyboard"""
    try:
        data = request.json
        action = data.get('action', 'type')
        
        if action == 'type':
            text = data.get('text', '')
            result = computer.type_text(text)
        elif action == 'press':
            key = data.get('key', '')
            result = computer.press_key(key)
        else:
            return jsonify({"error": "Unknown action"}), 400
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/browser/start', methods=['POST'])
def browser_start():
    """Start browser"""
    try:
        data = request.json or {}
        headless = data.get('headless', False)
        result = browser.start_browser(headless)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/browser/navigate', methods=['POST'])
def browser_navigate():
    """Navigate browser to URL"""
    try:
        data = request.json
        url = data.get('url', '')
        result = browser.navigate_to(url)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/browser/screenshot', methods=['POST'])
def browser_screenshot():
    """Take browser screenshot"""
    try:
        screenshot_b64 = browser.take_screenshot()
        if screenshot_b64:
            return jsonify({"screenshot": screenshot_b64})
        else:
            return jsonify({"error": "Browser not started"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/browser/info', methods=['GET'])
def browser_info():
    """Get current page info"""
    try:
        result = browser.get_page_info()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/browser/click', methods=['POST'])
def browser_click():
    """Click element in browser"""
    try:
        data = request.json
        selector = data.get('selector', '')
        result = browser.click_element(selector)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/browser/type', methods=['POST'])
def browser_type():
    """Type into element in browser"""
    try:
        data = request.json
        selector = data.get('selector', '')
        text = data.get('text', '')
        result = browser.type_into_element(selector, text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/browser/close', methods=['POST'])
def browser_close():
    """Close browser"""
    try:
        result = browser.close_browser()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Create necessary directories
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    
    print("=" * 60)
    print("🚀 Gemini 2.5 Web UI with Computer and Browser Use")
    print("=" * 60)
    print(f"API Key Configured: {bool(GEMINI_API_KEY)}")
    if not GEMINI_API_KEY:
        print("⚠️  Warning: GEMINI_API_KEY not set!")
        print("   Set it with: export GEMINI_API_KEY='your-api-key'")
    print("\nStarting server on http://localhost:5000")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
