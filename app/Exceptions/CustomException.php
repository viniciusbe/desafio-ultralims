<?php

namespace App\Exceptions;

class CustomException extends \Exception
{
    public static function internalException(): static
    {
        return new static(message: "INTERNAL_EXCEPTION", code: 500);
    }
}
