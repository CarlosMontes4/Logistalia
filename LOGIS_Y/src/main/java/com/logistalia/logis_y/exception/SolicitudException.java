package com.logistalia.logis_y.exception;

public class SolicitudException extends Exception{

    public SolicitudException(String message){
        super(message);
    }
    public SolicitudException(String message, Exception ex){
        super(message, ex);
    }
}