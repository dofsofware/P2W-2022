package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.Gains;

/**
 * Spring Data SQL repository for the Gains entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GainsRepository extends JpaRepository<Gains, Long> {}
