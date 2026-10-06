package com.develop.app.repository;

import com.develop.app.model.Empleado;
import com.develop.app.model.NominaEmpleados;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NominaEmpleadosRepository extends MongoRepository <NominaEmpleados, Long> {
}
