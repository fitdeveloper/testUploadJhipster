package com.example.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "car")
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "model", nullable = false)
    private String model;

    @OneToMany(mappedBy = "car")
    private Set<Doc> docs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public Car model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Set<Doc> getDocs() {
        return docs;
    }

    public Car docs(Set<Doc> docs) {
        this.docs = docs;
        return this;
    }

    public Car addDoc(Doc doc) {
        this.docs.add(doc);
        doc.setCar(this);
        return this;
    }

    public Car removeDoc(Doc doc) {
        this.docs.remove(doc);
        doc.setCar(null);
        return this;
    }

    public void setDocs(Set<Doc> docs) {
        this.docs = docs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Car)) {
            return false;
        }
        return id != null && id.equals(((Car) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Car{" +
            "id=" + getId() +
            ", model='" + getModel() + "'" +
            "}";
    }
}
