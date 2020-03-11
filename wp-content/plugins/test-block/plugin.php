<?php
/**
 * Plugin Name: Test Plugin
 * Author: Potapov Mikhail
 * Version: 1.0.0
 */

function loadMyBlock() {
  wp_enqueue_script(
    'my-new-block',
    plugin_dir_url(__FILE__) . 'test-block.js',
    array('wp-blocks','wp-editor'),
    true
  );

  $posts = [];
  foreach (get_posts() as $post) {
      $categories = array_map(function ($item) {
          return $item->cat_name;
      }, get_the_category($post->ID));

      $posts[] = [
          'date'       => $post->post_date,
          'title'      => $post->post_title,
          'miniature'  => get_the_post_thumbnail_url($post->ID, 'thumbnail'),
          'categories' => $categories,
      ];

  }

  $allCategories = array_unique(array_reduce(array_column($posts, 'categories'), function($res, $item) {
      return array_merge($res, $item);
  }, []));

    wp_localize_script( 'my-new-block', 'posts', $posts);
    wp_localize_script( 'my-new-block', 'categories', $allCategories);
}

add_action('enqueue_block_editor_assets', 'loadMyBlock');
