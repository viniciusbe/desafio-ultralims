<?php

namespace App\Exceptions;

class AddressException extends CustomException
{

    public static function zipCodeAlreadyExists(): AddressException
    {
        return new self("ZIP_CODE_ALREADY_EXISTS", code: 400);
    }

    public static function invalidFields(): AddressException
    {
        return new self("INVALID_FIELDS", code: 400);
    }
}
