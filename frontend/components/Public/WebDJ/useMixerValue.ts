import { onScopeDispose, ref } from "vue";
import createRequiredInjectionState from "~/functions/createRequiredInjectionState.ts";

const DUCK_TICK_MS = 30;
const DUCK_HOLD_MS = 500;
const DUCK_ATTACK_MS = 80;
const DUCK_RELEASE_MS = 700;

export const [useProvideMixer, useInjectMixer] = createRequiredInjectionState(
    (initialValue: number) => {
        const mixer = ref<number>(initialValue);

        // Ducking: lower the playlists while the microphone is picking up sound.
        const duckEnabled = ref(false);
        const duckAmount = ref(70); // Percent of reduction applied to the playlists.
        const duckThreshold = ref(15); // Microphone level (0-100) that triggers ducking.
        const micLevel = ref(0);
        const duckFactor = ref(1); // Multiplier applied to playlist gain (1 = no ducking).

        let lastLoud = 0;
        const timer = setInterval(() => {
            const now = performance.now();

            if (duckEnabled.value && micLevel.value > duckThreshold.value) {
                lastLoud = now;
            }

            const active = duckEnabled.value && now - lastLoud < DUCK_HOLD_MS;
            const target = active ? 1 - duckAmount.value / 100 : 1;

            const tau =
                target < duckFactor.value ? DUCK_ATTACK_MS : DUCK_RELEASE_MS;
            const next =
                duckFactor.value +
                (target - duckFactor.value) *
                    (1 - Math.exp(-DUCK_TICK_MS / tau));
            const settled = Math.abs(next - target) < 0.005 ? target : next;

            if (settled !== duckFactor.value) {
                duckFactor.value = settled;
            }
        }, DUCK_TICK_MS);
        onScopeDispose(() => clearInterval(timer));

        return {
            mixer,
            duckEnabled,
            duckAmount,
            duckThreshold,
            micLevel,
            duckFactor,
        };
    },
);
