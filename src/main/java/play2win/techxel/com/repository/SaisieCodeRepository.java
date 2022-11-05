package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.SaisieCode;

/**
 * Spring Data SQL repository for the SaisieCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SaisieCodeRepository extends JpaRepository<SaisieCode, Long> {}
