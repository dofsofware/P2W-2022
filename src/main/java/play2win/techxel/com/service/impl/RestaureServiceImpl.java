package play2win.techxel.com.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import play2win.techxel.com.domain.Restaure;
import play2win.techxel.com.repository.RestaureRepository;
import play2win.techxel.com.service.RestaureService;

/**
 * Service Implementation for managing {@link Restaure}.
 */
@Service
@Transactional
public class RestaureServiceImpl implements RestaureService {

    private final Logger log = LoggerFactory.getLogger(RestaureServiceImpl.class);

    private final RestaureRepository restaureRepository;

    public RestaureServiceImpl(RestaureRepository restaureRepository) {
        this.restaureRepository = restaureRepository;
    }

    @Override
    public Restaure save(Restaure restaure) {
        log.debug("Request to save Restaure : {}", restaure);
        return restaureRepository.save(restaure);
    }

    @Override
    public Restaure update(Restaure restaure) {
        log.debug("Request to save Restaure : {}", restaure);
        // no save call needed as we have no fields that can be updated
        return restaure;
    }

    @Override
    public Optional<Restaure> partialUpdate(Restaure restaure) {
        log.debug("Request to partially update Restaure : {}", restaure);

        return restaureRepository
            .findById(restaure.getId())
            .map(existingRestaure -> {
                return existingRestaure;
            }); // .map(restaureRepository::save)
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Restaure> findAll(Pageable pageable) {
        log.debug("Request to get all Restaures");
        return restaureRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Restaure> findOne(Long id) {
        log.debug("Request to get Restaure : {}", id);
        return restaureRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Restaure : {}", id);
        restaureRepository.deleteById(id);
    }
}
