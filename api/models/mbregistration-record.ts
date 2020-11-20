/* tslint:disable */
/* eslint-disable */
/**
 * Jellyfin API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * MB Registration Record.
 * @export
 * @interface MBRegistrationRecord
 */
export interface MBRegistrationRecord {
    /**
     * Gets or sets expiration date.
     * @type {string}
     * @memberof MBRegistrationRecord
     */
    ExpirationDate?: string;
    /**
     * Gets or sets a value indicating whether is registered.
     * @type {boolean}
     * @memberof MBRegistrationRecord
     */
    IsRegistered?: boolean;
    /**
     * Gets or sets a value indicating whether reg checked.
     * @type {boolean}
     * @memberof MBRegistrationRecord
     */
    RegChecked?: boolean;
    /**
     * Gets or sets a value indicating whether reg error.
     * @type {boolean}
     * @memberof MBRegistrationRecord
     */
    RegError?: boolean;
    /**
     * Gets or sets a value indicating whether trial version.
     * @type {boolean}
     * @memberof MBRegistrationRecord
     */
    TrialVersion?: boolean;
    /**
     * Gets or sets a value indicating whether is valid.
     * @type {boolean}
     * @memberof MBRegistrationRecord
     */
    IsValid?: boolean;
}

