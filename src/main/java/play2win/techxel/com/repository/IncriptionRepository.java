package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.Incription;

/**
 * Spring Data SQL repository for the Incription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncriptionRepository extends JpaRepository<Incription, Long> {}
