package com.logistalia.logis_y.exception;

public class EspacioException extends Exception{

    public EspacioException(String message){
        super(message);
    }
    public EspacioException(String message, Exception ex){
        super(message, ex);
    }
}
