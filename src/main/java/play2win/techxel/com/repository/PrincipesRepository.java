package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.Principes;

/**
 * Spring Data SQL repository for the Principes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrincipesRepository extends JpaRepository<Principes, Long> {}
