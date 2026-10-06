package com.develop.app.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TblPais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPais;

    @Column(length = 2)
    private String iso;

    @Column(length = 100)
    private String nombre;
}
