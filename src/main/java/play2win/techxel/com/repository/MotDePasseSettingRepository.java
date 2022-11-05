package play2win.techxel.com.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import play2win.techxel.com.domain.MotDePasseSetting;

/**
 * Spring Data SQL repository for the MotDePasseSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MotDePasseSettingRepository extends JpaRepository<MotDePasseSetting, Long> {}
