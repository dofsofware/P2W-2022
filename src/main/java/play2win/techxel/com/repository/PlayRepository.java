package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.Play;

/**
 * Spring Data SQL repository for the Play entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayRepository extends JpaRepository<Play, Long> {}
