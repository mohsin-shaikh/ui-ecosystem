const {
  withGradleProperties,
  withSettingsGradle,
} = require("expo/config-plugins");

/** @type {string | undefined} */
const ANDROID_STUDIO_JBR =
  process.platform === "darwin"
    ? "/Applications/Android Studio.app/Contents/jbr/Contents/Home"
    : process.env.JAVA_HOME;

const GRADLE_PROPERTY_KEYS = new Set([
  "org.gradle.java.home",
  "org.gradle.java.installations.auto-detect",
  "org.gradle.java.installations.auto-download",
  "org.gradle.java.installations.paths",
]);

const FOOJAY_PLUGIN =
  'id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"';

/**
 * Pin Gradle to a standard JDK and provision Java 17 toolchains without GraalVM.
 */
function withAndroidJavaHome(config) {
  if (!ANDROID_STUDIO_JBR) {
    console.warn(
      "[with-android-java-home] No JDK path found. Set JAVA_HOME or install Android Studio.",
    );
    return config;
  }

  config = withGradleProperties(config, (config) => {
    config.modResults = config.modResults.filter(
      (item) =>
        !(item.type === "property" && GRADLE_PROPERTY_KEYS.has(item.key)),
    );

    config.modResults.push(
      {
        type: "property",
        key: "org.gradle.java.home",
        value: ANDROID_STUDIO_JBR,
      },
      {
        type: "property",
        key: "org.gradle.java.installations.auto-detect",
        value: "false",
      },
      {
        type: "property",
        key: "org.gradle.java.installations.auto-download",
        value: "true",
      },
      {
        type: "property",
        key: "org.gradle.java.installations.paths",
        value: ANDROID_STUDIO_JBR,
      },
    );

    return config;
  });

  config = withSettingsGradle(config, (config) => {
    if (config.modResults.contents.includes("foojay-resolver-convention")) {
      return config;
    }

    config.modResults.contents = config.modResults.contents.replace(
      "plugins {",
      `plugins {
  ${FOOJAY_PLUGIN}`,
    );

    return config;
  });

  return config;
}

module.exports = withAndroidJavaHome;
