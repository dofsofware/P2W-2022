package play2win.techxel.com.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.Abonne;

/**
 * Spring Data SQL repository for the Abonne entity.
 */
@Repository
public interface AbonneRepository extends AbonneRepositoryWithBagRelationships, JpaRepository<Abonne, Long> {
    default Optional<Abonne> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Abonne> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Abonne> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
