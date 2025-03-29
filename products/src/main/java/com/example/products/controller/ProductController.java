package com.example.products.controller;

import com.example.products.model.products;
import com.example.products.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite frontend to access
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/getall")
    public List<products> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/create")
    public products createProduct(@RequestBody products product) {
        return productRepository.save(product);
    }

    @GetMapping("/get/{id}")
    public products getProductById(@PathVariable String id) {
        return productRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Product not found with id: " + id));
    }

    @PutMapping("/update/{id}")
    public products updateProduct(@PathVariable String id, @RequestBody products productDetails) {
        products product = productRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Product not found with id: " + id));
        
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setDescription(productDetails.getDescription());
        
        return productRepository.save(product);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable String id) {
        productRepository.deleteById(id);
    }
}