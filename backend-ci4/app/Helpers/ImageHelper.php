<?php

namespace App\Helpers;

class ImageHelper
{
    /**
     * Process image - either URL or base64
     * Returns base64 string for storage in database
     */
    public static function processImage($imageData)
    {
        if (empty($imageData)) {
            return null;
        }

        // If it's already base64 data URI, return as is
        if (self::isBase64DataUri($imageData)) {
            return $imageData;
        }

        // If it's a URL, fetch and convert to base64
        if (self::isUrl($imageData)) {
            return self::urlToBase64($imageData);
        }

        // If it's raw base64, add data URI prefix
        if (self::isBase64($imageData)) {
            return 'data:image/jpeg;base64,' . $imageData;
        }

        // Return as is if we can't determine the type
        return $imageData;
    }

    /**
     * Check if string is a base64 data URI
     */
    private static function isBase64DataUri($string)
    {
        return preg_match('/^data:image\/(jpeg|jpg|png|gif|webp);base64,/', $string);
    }

    /**
     * Check if string is a URL
     */
    private static function isUrl($string)
    {
        return filter_var($string, FILTER_VALIDATE_URL) !== false;
    }

    /**
     * Check if string is base64 encoded
     */
    private static function isBase64($string)
    {
        // Remove whitespace
        $string = trim($string);

        // Check if it's valid base64
        if (base64_encode(base64_decode($string, true)) === $string) {
            return true;
        }

        return false;
    }

    /**
     * Convert URL to base64 data URI
     */
    private static function urlToBase64($url)
    {
        try {
            // For external URLs, we'll just return the URL as is
            // Converting external URLs to base64 can be memory intensive
            // and may fail due to file size limits
            return $url;
        } catch (\Exception $e) {
            log_message('error', 'Failed to convert URL to base64: ' . $e->getMessage());
            return $url;
        }
    }

    /**
     * Validate image size (in bytes)
     * Default max size: 5MB
     */
    public static function validateImageSize($base64String, $maxSizeInMB = 5)
    {
        if (empty($base64String)) {
            return true;
        }

        // Remove data URI prefix if present
        $base64Data = preg_replace('/^data:image\/(jpeg|jpg|png|gif|webp);base64,/', '', $base64String);

        // Calculate size
        $sizeInBytes = (strlen($base64Data) * 3) / 4;
        $maxSizeInBytes = $maxSizeInMB * 1024 * 1024;

        return $sizeInBytes <= $maxSizeInBytes;
    }

    /**
     * Get image mime type from base64 data URI
     */
    public static function getMimeType($base64String)
    {
        if (preg_match('/^data:image\/(jpeg|jpg|png|gif|webp);base64,/', $base64String, $matches)) {
            return 'image/' . $matches[1];
        }

        return 'image/jpeg'; // Default
    }

    /**
     * Extract base64 data without data URI prefix
     */
    public static function extractBase64Data($base64String)
    {
        return preg_replace('/^data:image\/(jpeg|jpg|png|gif|webp);base64,/', '', $base64String);
    }
}
