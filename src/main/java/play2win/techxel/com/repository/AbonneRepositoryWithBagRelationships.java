package play2win.techxel.com.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import play2win.techxel.com.domain.Abonne;

public interface AbonneRepositoryWithBagRelationships {
    Optional<Abonne> fetchBagRelationships(Optional<Abonne> abonne);

    List<Abonne> fetchBagRelationships(List<Abonne> abonnes);

    Page<Abonne> fetchBagRelationships(Page<Abonne> abonnes);
}
