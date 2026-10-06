package com.develop.app.model;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class TblTipoCombustible {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTipoCombustible;

    @Column(length = 20)
    private String tcNombre;
}
