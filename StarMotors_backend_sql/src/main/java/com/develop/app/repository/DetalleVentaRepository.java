package com.develop.app.repository;

import com.develop.app.model.TblCliente;
import com.develop.app.model.TblVehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.develop.app.model.TblDetalleVenta;

import java.util.List;

public interface DetalleVentaRepository extends JpaRepository<TblDetalleVenta, Long>{

    List<TblDetalleVenta> findByEncabezadoVenta_Cliente(TblCliente cliente);

    TblDetalleVenta findByVehiculo(TblVehiculo vehiculo);
}
