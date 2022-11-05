package play2win.techxel.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import play2win.techxel.com.web.rest.TestUtil;

class ChoixTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Choix.class);
        Choix choix1 = new Choix();
        choix1.setId(1L);
        Choix choix2 = new Choix();
        choix2.setId(choix1.getId());
        assertThat(choix1).isEqualTo(choix2);
        choix2.setId(2L);
        assertThat(choix1).isNotEqualTo(choix2);
        choix1.setId(null);
        assertThat(choix1).isNotEqualTo(choix2);
    }
}
