package com.example.myapp.repository;

import com.example.myapp.domain.Doc;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Doc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocRepository extends JpaRepository<Doc, Long> {
}
