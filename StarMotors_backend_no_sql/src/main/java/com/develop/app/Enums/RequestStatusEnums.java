package com.develop.app.Enums;

public enum RequestStatusEnums {

    PENDIENTE(1, "Estado de solicitud"),
    PROCESADO(2, "Estado de solicitud"),
    ELIMINADA(3, "Estado de solicitud"),
    RECHAZADO(4, "Estado de solicitud"),
    ACEPTADO(5, "Estado de solicitud"),
    FINALIZADO(6, "Estado de solicitud");

    public final Integer idStatus;
    public final String type;

    RequestStatusEnums(Integer idStatus, String type) {
        this.idStatus = idStatus;
        this.type = type;
    }
}
