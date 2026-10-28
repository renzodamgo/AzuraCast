<template>
    <div class="mixer card">
        <div class="card-header text-bg-primary">
            <div class="d-flex align-items-center">
                <div class="flex-fill">
                    <h5 class="card-title">
                        {{ $gettext('Mixer') }}
                    </h5>
                </div>
                <div class="flex-shrink-0 ps-3">
                    <div class="d-flex flex-row align-items-center">
                        <div class="flex-shrink-0">
                            {{ $gettext('Playlist 1') }}
                        </div>
                        <div class="flex-fill px-2">
                            <input
                                v-model.number="mixer"
                                type="range"
                                min="0"
                                max="2"
                                step="0.05"
                                class="form-range slider"
                                style="width: 200px; height: 10px;"
                                @click.right.prevent="mixer = 1.0"
                            >
                        </div>
                        <div class="flex-shrink-0">
                            {{ $gettext('Playlist 2') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="d-flex flex-wrap align-items-center gap-3">
                <div class="form-check form-switch mb-0">
                    <input
                        id="duck_enabled"
                        v-model="duckEnabled"
                        type="checkbox"
                        class="form-check-input"
                    >
                    <label
                        for="duck_enabled"
                        class="form-check-label"
                    >
                        {{ $gettext('Lower playlists while the microphone is active (ducking)') }}
                    </label>
                </div>
                <div class="d-flex align-items-center">
                    <label
                        for="duck_amount"
                        class="me-2 text-nowrap"
                    >
                        {{ $gettext('Ducking Amount') }}
                    </label>
                    <input
                        id="duck_amount"
                        v-model.number="duckAmount"
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        class="form-range slider"
                        style="width: 150px; height: 10px;"
                        :disabled="!duckEnabled"
                    >
                    <span class="ms-2 text-nowrap">{{ duckAmount }}%</span>
                </div>
                <div class="d-flex align-items-center">
                    <label
                        for="duck_threshold"
                        class="me-2 text-nowrap"
                    >
                        {{ $gettext('Microphone Threshold') }}
                    </label>
                    <input
                        id="duck_threshold"
                        v-model.number="duckThreshold"
                        type="range"
                        min="1"
                        max="60"
                        step="1"
                        class="form-range slider"
                        style="width: 150px; height: 10px;"
                        :disabled="!duckEnabled"
                    >
                </div>
                <div
                    v-if="duckEnabled"
                    class="text-nowrap"
                    data-test="duck-status"
                >
                    {{ $gettext('Playlists reduced by:') }}
                    {{ Math.round((1 - duckFactor) * 100) }}%
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useInjectMixer } from "~/components/Public/WebDJ/useMixerValue";

const { mixer, duckEnabled, duckAmount, duckThreshold, duckFactor } =
    useInjectMixer();
</script>
