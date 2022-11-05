package play2win.techxel.com.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import play2win.techxel.com.domain.Restaure;

/**
 * Service Interface for managing {@link Restaure}.
 */
public interface RestaureService {
    /**
     * Save a restaure.
     *
     * @param restaure the entity to save.
     * @return the persisted entity.
     */
    Restaure save(Restaure restaure);

    /**
     * Updates a restaure.
     *
     * @param restaure the entity to update.
     * @return the persisted entity.
     */
    Restaure update(Restaure restaure);

    /**
     * Partially updates a restaure.
     *
     * @param restaure the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Restaure> partialUpdate(Restaure restaure);

    /**
     * Get all the restaures.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Restaure> findAll(Pageable pageable);

    /**
     * Get the "id" restaure.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Restaure> findOne(Long id);

    /**
     * Delete the "id" restaure.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
