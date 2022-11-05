package play2win.techxel.com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import play2win.techxel.com.domain.Presentation;
import play2win.techxel.com.repository.PresentationRepository;
import play2win.techxel.com.service.PresentationService;
import play2win.techxel.com.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link play2win.techxel.com.domain.Presentation}.
 */
@RestController
@RequestMapping("/api")
public class PresentationResource {

    private final Logger log = LoggerFactory.getLogger(PresentationResource.class);

    private static final String ENTITY_NAME = "presentation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PresentationService presentationService;

    private final PresentationRepository presentationRepository;

    public PresentationResource(PresentationService presentationService, PresentationRepository presentationRepository) {
        this.presentationService = presentationService;
        this.presentationRepository = presentationRepository;
    }

    /**
     * {@code POST  /presentations} : Create a new presentation.
     *
     * @param presentation the presentation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new presentation, or with status {@code 400 (Bad Request)} if the presentation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/presentations")
    public ResponseEntity<Presentation> createPresentation(@RequestBody Presentation presentation) throws URISyntaxException {
        log.debug("REST request to save Presentation : {}", presentation);
        if (presentation.getId() != null) {
            throw new BadRequestAlertException("A new presentation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Presentation result = presentationService.save(presentation);
        return ResponseEntity
            .created(new URI("/api/presentations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /presentations/:id} : Updates an existing presentation.
     *
     * @param id the id of the presentation to save.
     * @param presentation the presentation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated presentation,
     * or with status {@code 400 (Bad Request)} if the presentation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the presentation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/presentations/{id}")
    public ResponseEntity<Presentation> updatePresentation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Presentation presentation
    ) throws URISyntaxException {
        log.debug("REST request to update Presentation : {}, {}", id, presentation);
        if (presentation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, presentation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!presentationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Presentation result = presentationService.update(presentation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, presentation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /presentations/:id} : Partial updates given fields of an existing presentation, field will ignore if it is null
     *
     * @param id the id of the presentation to save.
     * @param presentation the presentation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated presentation,
     * or with status {@code 400 (Bad Request)} if the presentation is not valid,
     * or with status {@code 404 (Not Found)} if the presentation is not found,
     * or with status {@code 500 (Internal Server Error)} if the presentation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/presentations/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Presentation> partialUpdatePresentation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Presentation presentation
    ) throws URISyntaxException {
        log.debug("REST request to partial update Presentation partially : {}, {}", id, presentation);
        if (presentation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, presentation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!presentationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Presentation> result = presentationService.partialUpdate(presentation);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, presentation.getId().toString())
        );
    }

    /**
     * {@code GET  /presentations} : get all the presentations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of presentations in body.
     */
    @GetMapping("/presentations")
    public ResponseEntity<List<Presentation>> getAllPresentations(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Presentations");
        Page<Presentation> page = presentationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /presentations/:id} : get the "id" presentation.
     *
     * @param id the id of the presentation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the presentation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/presentations/{id}")
    public ResponseEntity<Presentation> getPresentation(@PathVariable Long id) {
        log.debug("REST request to get Presentation : {}", id);
        Optional<Presentation> presentation = presentationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(presentation);
    }

    /**
     * {@code DELETE  /presentations/:id} : delete the "id" presentation.
     *
     * @param id the id of the presentation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/presentations/{id}")
    public ResponseEntity<Void> deletePresentation(@PathVariable Long id) {
        log.debug("REST request to delete Presentation : {}", id);
        presentationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
