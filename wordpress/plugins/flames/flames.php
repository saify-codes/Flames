<?php

/**
 * Plugin Name: Flames
 * Description: Custom REST API endpoints for Flames app.
 * Version: 1.0.0
 * Author: Saify
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Add custom API endpoints.
require_once plugin_dir_path(__FILE__) . 'routes/apis.php';
