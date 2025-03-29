package com.example.products.repository;

import com.example.products.model.products;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<products, String> {
}