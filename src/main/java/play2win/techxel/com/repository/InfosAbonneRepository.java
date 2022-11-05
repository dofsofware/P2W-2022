package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.InfosAbonne;

/**
 * Spring Data SQL repository for the InfosAbonne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InfosAbonneRepository extends JpaRepository<InfosAbonne, Long> {}
