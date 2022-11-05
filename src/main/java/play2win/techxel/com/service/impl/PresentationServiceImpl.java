package play2win.techxel.com.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import play2win.techxel.com.domain.Presentation;
import play2win.techxel.com.repository.PresentationRepository;
import play2win.techxel.com.service.PresentationService;

/**
 * Service Implementation for managing {@link Presentation}.
 */
@Service
@Transactional
public class PresentationServiceImpl implements PresentationService {

    private final Logger log = LoggerFactory.getLogger(PresentationServiceImpl.class);

    private final PresentationRepository presentationRepository;

    public PresentationServiceImpl(PresentationRepository presentationRepository) {
        this.presentationRepository = presentationRepository;
    }

    @Override
    public Presentation save(Presentation presentation) {
        log.debug("Request to save Presentation : {}", presentation);
        return presentationRepository.save(presentation);
    }

    @Override
    public Presentation update(Presentation presentation) {
        log.debug("Request to save Presentation : {}", presentation);
        // no save call needed as we have no fields that can be updated
        return presentation;
    }

    @Override
    public Optional<Presentation> partialUpdate(Presentation presentation) {
        log.debug("Request to partially update Presentation : {}", presentation);

        return presentationRepository
            .findById(presentation.getId())
            .map(existingPresentation -> {
                return existingPresentation;
            }); // .map(presentationRepository::save)
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Presentation> findAll(Pageable pageable) {
        log.debug("Request to get all Presentations");
        return presentationRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Presentation> findOne(Long id) {
        log.debug("Request to get Presentation : {}", id);
        return presentationRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Presentation : {}", id);
        presentationRepository.deleteById(id);
    }
}
