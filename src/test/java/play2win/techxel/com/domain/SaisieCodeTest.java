package play2win.techxel.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import play2win.techxel.com.web.rest.TestUtil;

class SaisieCodeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SaisieCode.class);
        SaisieCode saisieCode1 = new SaisieCode();
        saisieCode1.setId(1L);
        SaisieCode saisieCode2 = new SaisieCode();
        saisieCode2.setId(saisieCode1.getId());
        assertThat(saisieCode1).isEqualTo(saisieCode2);
        saisieCode2.setId(2L);
        assertThat(saisieCode1).isNotEqualTo(saisieCode2);
        saisieCode1.setId(null);
        assertThat(saisieCode1).isNotEqualTo(saisieCode2);
    }
}
