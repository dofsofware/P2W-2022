package play2win.techxel.com.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import play2win.techxel.com.domain.Profil;
import play2win.techxel.com.repository.ProfilRepository;
import play2win.techxel.com.service.ProfilService;

/**
 * Service Implementation for managing {@link Profil}.
 */
@Service
@Transactional
public class ProfilServiceImpl implements ProfilService {

    private final Logger log = LoggerFactory.getLogger(ProfilServiceImpl.class);

    private final ProfilRepository profilRepository;

    public ProfilServiceImpl(ProfilRepository profilRepository) {
        this.profilRepository = profilRepository;
    }

    @Override
    public Profil save(Profil profil) {
        log.debug("Request to save Profil : {}", profil);
        return profilRepository.save(profil);
    }

    @Override
    public Profil update(Profil profil) {
        log.debug("Request to save Profil : {}", profil);
        // no save call needed as we have no fields that can be updated
        return profil;
    }

    @Override
    public Optional<Profil> partialUpdate(Profil profil) {
        log.debug("Request to partially update Profil : {}", profil);

        return profilRepository
            .findById(profil.getId())
            .map(existingProfil -> {
                return existingProfil;
            }); // .map(profilRepository::save)
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Profil> findAll(Pageable pageable) {
        log.debug("Request to get all Profils");
        return profilRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Profil> findOne(Long id) {
        log.debug("Request to get Profil : {}", id);
        return profilRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Profil : {}", id);
        profilRepository.deleteById(id);
    }
}
