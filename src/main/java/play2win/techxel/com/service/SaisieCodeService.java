package play2win.techxel.com.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import play2win.techxel.com.domain.SaisieCode;

/**
 * Service Interface for managing {@link SaisieCode}.
 */
public interface SaisieCodeService {
    /**
     * Save a saisieCode.
     *
     * @param saisieCode the entity to save.
     * @return the persisted entity.
     */
    SaisieCode save(SaisieCode saisieCode);

    /**
     * Updates a saisieCode.
     *
     * @param saisieCode the entity to update.
     * @return the persisted entity.
     */
    SaisieCode update(SaisieCode saisieCode);

    /**
     * Partially updates a saisieCode.
     *
     * @param saisieCode the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SaisieCode> partialUpdate(SaisieCode saisieCode);

    /**
     * Get all the saisieCodes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SaisieCode> findAll(Pageable pageable);

    /**
     * Get the "id" saisieCode.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SaisieCode> findOne(Long id);

    /**
     * Delete the "id" saisieCode.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
