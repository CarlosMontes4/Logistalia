package com.logistalia.logis_y.exception;

public class ArticuloException extends Exception{
    public ArticuloException(String message){
        super(message);
    }
    public ArticuloException(String message, Exception ex){
        super(message, ex);
    }
}
