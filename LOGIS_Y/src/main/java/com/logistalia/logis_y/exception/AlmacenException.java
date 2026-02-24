package com.logistalia.logis_y.exception;

public class AlmacenException extends Exception{
    public AlmacenException(String message){
        super(message);
    }
    public AlmacenException(String message, Exception ex){
        super(message, ex);
    }
}
