package play2win.techxel.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import play2win.techxel.com.web.rest.TestUtil;

class GainsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gains.class);
        Gains gains1 = new Gains();
        gains1.setId(1L);
        Gains gains2 = new Gains();
        gains2.setId(gains1.getId());
        assertThat(gains1).isEqualTo(gains2);
        gains2.setId(2L);
        assertThat(gains1).isNotEqualTo(gains2);
        gains1.setId(null);
        assertThat(gains1).isNotEqualTo(gains2);
    }
}
