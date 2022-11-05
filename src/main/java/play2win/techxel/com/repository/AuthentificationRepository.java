package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.Authentification;

/**
 * Spring Data SQL repository for the Authentification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuthentificationRepository extends JpaRepository<Authentification, Long> {}
