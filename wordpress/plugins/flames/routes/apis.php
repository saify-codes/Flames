<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Register custom REST API endpoints.
add_action( 'rest_api_init', function () {

    // GET: Fetch posts.
    register_rest_route( 'myapp/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'myapp_get_posts',
    ));

    // POST: Create a new post.
    register_rest_route( 'myapp/v1', '/posts', array(
        'methods' => 'POST',
        'callback' => 'myapp_create_post',
        'permission_callback' => 'myapp_permissions_check',
    ));

    // PUT: Update a post.
    register_rest_route( 'myapp/v1', '/posts/(?P<id>\d+)', array(
        'methods' => 'PUT',
        'callback' => 'myapp_update_post',
        'permission_callback' => 'myapp_permissions_check',
    ));

    // DELETE: Delete a post.
    register_rest_route( 'myapp/v1', '/posts/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'myapp_delete_post',
        'permission_callback' => 'myapp_permissions_check',
    ));

    // Example: Custom member endpoint.
    register_rest_route( 'myapp/v1', '/members', array(
        'methods' => 'GET',
        'callback' => 'myapp_get_members',
        'permission_callback' => '__return_true',
    ));
});

// Callback functions.
function myapp_get_posts( $request ) {
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'numberposts' => -1,
    );

    $posts = get_posts( $args );

    return rest_ensure_response( $posts );
}

function myapp_create_post( $request ) {
    $params = $request->get_json_params();
    $post_id = wp_insert_post(array(
        'post_title' => sanitize_text_field($params['title']),
        'post_content' => sanitize_textarea_field($params['content']),
        'post_status' => 'publish',
    ));

    if ( is_wp_error( $post_id ) ) {
        return new WP_Error( 'post_creation_failed', 'Failed to create post', array( 'status' => 500 ) );
    }

    return rest_ensure_response( array( 'id' => $post_id ) );
}

function myapp_update_post( $request ) {
    $id = (int) $request['id'];
    $params = $request->get_json_params();

    $post_id = wp_update_post(array(
        'ID' => $id,
        'post_title' => sanitize_text_field($params['title']),
        'post_content' => sanitize_textarea_field($params['content']),
    ));

    if ( is_wp_error( $post_id ) ) {
        return new WP_Error( 'post_update_failed', 'Failed to update post', array( 'status' => 500 ) );
    }

    return rest_ensure_response( array( 'id' => $post_id ) );
}

function myapp_delete_post( $request ) {
    $id = (int) $request['id'];

    $deleted = wp_delete_post( $id, true );

    if ( ! $deleted ) {
        return new WP_Error( 'post_deletion_failed', 'Failed to delete post', array( 'status' => 500 ) );
    }

    return rest_ensure_response( array( 'deleted' => true ) );
}

function myapp_get_members() {
    // Example data; replace with actual user data if needed.
    $users = get_users(array('fields' => array('ID', 'display_name', 'user_email')));
    return rest_ensure_response( $users );
}

// Permission callback example.
function myapp_permissions_check( $request ) {
    return current_user_can( 'edit_posts' );
}
