package play2win.techxel.com.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import play2win.techxel.com.domain.Presentation;

/**
 * Service Interface for managing {@link Presentation}.
 */
public interface PresentationService {
    /**
     * Save a presentation.
     *
     * @param presentation the entity to save.
     * @return the persisted entity.
     */
    Presentation save(Presentation presentation);

    /**
     * Updates a presentation.
     *
     * @param presentation the entity to update.
     * @return the persisted entity.
     */
    Presentation update(Presentation presentation);

    /**
     * Partially updates a presentation.
     *
     * @param presentation the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Presentation> partialUpdate(Presentation presentation);

    /**
     * Get all the presentations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Presentation> findAll(Pageable pageable);

    /**
     * Get the "id" presentation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Presentation> findOne(Long id);

    /**
     * Delete the "id" presentation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
