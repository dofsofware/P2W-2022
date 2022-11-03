package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import play2win.techxel.com.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
