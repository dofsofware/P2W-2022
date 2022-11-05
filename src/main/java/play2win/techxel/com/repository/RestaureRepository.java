package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.Restaure;

/**
 * Spring Data SQL repository for the Restaure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestaureRepository extends JpaRepository<Restaure, Long> {}
