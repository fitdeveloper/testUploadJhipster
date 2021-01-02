package com.example.myapp.web.rest;

import com.example.myapp.domain.Doc;
import com.example.myapp.repository.DocRepository;
import com.example.myapp.repository.search.DocSearchRepository;
import com.example.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.example.myapp.domain.Doc}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DocResource {

    private final Logger log = LoggerFactory.getLogger(DocResource.class);

    private static final String ENTITY_NAME = "doc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocRepository docRepository;

    private final DocSearchRepository docSearchRepository;

    public DocResource(DocRepository docRepository, DocSearchRepository docSearchRepository) {
        this.docRepository = docRepository;
        this.docSearchRepository = docSearchRepository;
    }

    /**
     * {@code POST  /docs} : Create a new doc.
     *
     * @param doc the doc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new doc, or with status {@code 400 (Bad Request)} if the doc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/docs")
    public ResponseEntity<Doc> createDoc(@Valid @RequestBody Doc doc) throws URISyntaxException {
        log.debug("REST request to save Doc : {}", doc);
        if (doc.getId() != null) {
            throw new BadRequestAlertException("A new doc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Doc result = docRepository.save(doc);
        docSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/docs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /docs} : Updates an existing doc.
     *
     * @param doc the doc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated doc,
     * or with status {@code 400 (Bad Request)} if the doc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the doc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/docs")
    public ResponseEntity<Doc> updateDoc(@Valid @RequestBody Doc doc) throws URISyntaxException {
        log.debug("REST request to update Doc : {}", doc);
        if (doc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Doc result = docRepository.save(doc);
        docSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, doc.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /docs} : get all the docs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of docs in body.
     */
    @GetMapping("/docs")
    public List<Doc> getAllDocs() {
        log.debug("REST request to get all Docs");
        return docRepository.findAll();
    }

    /**
     * {@code GET  /docs/:id} : get the "id" doc.
     *
     * @param id the id of the doc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the doc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/docs/{id}")
    public ResponseEntity<Doc> getDoc(@PathVariable Long id) {
        log.debug("REST request to get Doc : {}", id);
        Optional<Doc> doc = docRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(doc);
    }

    /**
     * {@code DELETE  /docs/:id} : delete the "id" doc.
     *
     * @param id the id of the doc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/docs/{id}")
    public ResponseEntity<Void> deleteDoc(@PathVariable Long id) {
        log.debug("REST request to delete Doc : {}", id);
        docRepository.deleteById(id);
        docSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/docs?query=:query} : search for the doc corresponding
     * to the query.
     *
     * @param query the query of the doc search.
     * @return the result of the search.
     */
    @GetMapping("/_search/docs")
    public List<Doc> searchDocs(@RequestParam String query) {
        log.debug("REST request to search Docs for query {}", query);
        return StreamSupport
            .stream(docSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
