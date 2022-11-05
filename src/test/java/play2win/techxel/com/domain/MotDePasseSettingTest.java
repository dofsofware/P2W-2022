package play2win.techxel.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import play2win.techxel.com.web.rest.TestUtil;

class MotDePasseSettingTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MotDePasseSetting.class);
        MotDePasseSetting motDePasseSetting1 = new MotDePasseSetting();
        motDePasseSetting1.setId(1L);
        MotDePasseSetting motDePasseSetting2 = new MotDePasseSetting();
        motDePasseSetting2.setId(motDePasseSetting1.getId());
        assertThat(motDePasseSetting1).isEqualTo(motDePasseSetting2);
        motDePasseSetting2.setId(2L);
        assertThat(motDePasseSetting1).isNotEqualTo(motDePasseSetting2);
        motDePasseSetting1.setId(null);
        assertThat(motDePasseSetting1).isNotEqualTo(motDePasseSetting2);
    }
}
