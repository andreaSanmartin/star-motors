package com.develop.app.repository;

import com.develop.app.model.TblRoles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<TblRoles, Integer> {
}
