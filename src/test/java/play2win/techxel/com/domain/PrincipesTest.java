package play2win.techxel.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import play2win.techxel.com.web.rest.TestUtil;

class PrincipesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Principes.class);
        Principes principes1 = new Principes();
        principes1.setId(1L);
        Principes principes2 = new Principes();
        principes2.setId(principes1.getId());
        assertThat(principes1).isEqualTo(principes2);
        principes2.setId(2L);
        assertThat(principes1).isNotEqualTo(principes2);
        principes1.setId(null);
        assertThat(principes1).isNotEqualTo(principes2);
    }
}
