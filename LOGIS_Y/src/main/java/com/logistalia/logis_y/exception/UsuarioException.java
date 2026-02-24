package com.logistalia.logis_y.exception;

public class UsuarioException extends Exception{

    public UsuarioException(String message){
        super(message);
    }
    public UsuarioException(String message, Exception ex){
        super(message, ex);
    }
}