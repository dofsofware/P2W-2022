package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.Choix;

/**
 * Spring Data SQL repository for the Choix entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChoixRepository extends JpaRepository<Choix, Long> {}
