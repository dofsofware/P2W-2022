package play2win.techxel.com.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import play2win.techxel.com.domain.Profil;

/**
 * Service Interface for managing {@link Profil}.
 */
public interface ProfilService {
    /**
     * Save a profil.
     *
     * @param profil the entity to save.
     * @return the persisted entity.
     */
    Profil save(Profil profil);

    /**
     * Updates a profil.
     *
     * @param profil the entity to update.
     * @return the persisted entity.
     */
    Profil update(Profil profil);

    /**
     * Partially updates a profil.
     *
     * @param profil the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Profil> partialUpdate(Profil profil);

    /**
     * Get all the profils.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Profil> findAll(Pageable pageable);

    /**
     * Get the "id" profil.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Profil> findOne(Long id);

    /**
     * Delete the "id" profil.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
